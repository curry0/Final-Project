using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class UserParams : Params
    {
        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
    }
}