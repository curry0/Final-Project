using API.DisplayModels;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepo;
        private readonly IMapper _mapper;
        public ProductsController(IProductRepository productRepo, IMapper mapper)
        {
            _mapper = mapper;
            _productRepo = productRepo;
            
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductDisplayModel>>> GetProducts()
        {
            var products = await _productRepo.GetProductsAsync();
            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDisplayModel>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDisplayModel>> GetProduct(int id)
        {
            var product = await _productRepo.GetProductByIdAsync(id);

            return _mapper.Map<Product, ProductDisplayModel>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productRepo.GetProductBrandsAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productRepo.GetProductTypesAsync());
        }
    }
}