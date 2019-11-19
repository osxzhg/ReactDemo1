using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReactDemo1.Models
{
    public partial class Products
    {
        public Products()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(100)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Product Price is required")]
        [Range(0, 10000, ErrorMessage = "Price must be between 0 and 10000000")]
        public decimal Price { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
