using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ReactDemo1.Models
{
    public class SalesViewModel
    {
        [Key]
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string ProductName { get; set; }
        public string StoreName { get; set; }
        public string DateSold { get; set; }
    }
}
