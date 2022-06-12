using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebApplication24.Models;

using System.Linq;
using System.Xml.Linq;
using System;

using System.Diagnostics;
using System.Threading.Tasks;

namespace WebApplication24.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
   
        public HomeController(ILogger<HomeController> logger )
        {
            

            _logger = logger;
        }

        public IActionResult Index()
        {

            return View();
        }
    }
}
