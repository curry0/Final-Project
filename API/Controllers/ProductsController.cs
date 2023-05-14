using API.DisplayModels;
using API.Entities;
using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ProductsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<PagedList<ProductDisplayModel>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var products = await _unitOfWork.ProductRepository.GetProductsAsync(productParams);

            Response.AddPaginationHeader(new PaginationHeader(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages));
            
            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDisplayModel>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDisplayModel>> GetProduct(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(id);

            if (product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductDisplayModel>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _unitOfWork.ProductRepository.GetProductBrandsAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _unitOfWork.ProductRepository.GetProductTypesAsync());
        }

        [HttpPost]
        public async Task<ActionResult<ProductDisplayModel>> CreateProduct([FromForm] CreateProductDisplayModel model)
        {
            if (model.PictureUrl == null || model.PictureUrl.Length == 0)
            {
                return BadRequest(new ApiResponse(400, "No image file provided."));
            }

            // Generate a unique file name for the image
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + model.PictureUrl.FileName;

            // Construct the file path where the image will be saved
            var filePath = Path.Combine("Content", "images", "products", uniqueFileName);

            // Save the image to the file path
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.PictureUrl.CopyToAsync(stream);
            }

            var product = new Product
            {
                Name = model.Name,
                Description = model.Description,
                Price = model.Price,
                PictureUrl = Path.Combine("images", "products", uniqueFileName).Replace('\\', '/'),
                ProductBrand = await _unitOfWork.ProductRepository.GetProductBrandByIdAsync(model.ProductBrandId),
                ProductType = await _unitOfWork.ProductRepository.GetProductTypeByIdAsync(model.ProductTypeId),
            };

            _unitOfWork.ProductRepository.AddProduct(product);
            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<ProductDisplayModel>(product));
            return BadRequest(new ApiResponse(400, "Problem creating product"));
        }


    }
}