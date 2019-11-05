using System;
using System.Collections.Generic;

namespace ReactDemo1.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int StoreId { get; set; }
        public int CustomerId { get; set; }
        public DateTime DateSold { get; set; }

        public Customers Customer { get; set; }
        public Products Product { get; set; }
        public Stores Store { get; set; }
    }
}
