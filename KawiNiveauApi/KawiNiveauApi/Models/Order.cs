namespace KawiNiveauApi.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public Status OrderStatus { get; set; }

        public decimal TotalAmount { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
    public enum Status
        {
            Pending,
            Completed,
            Cancelled
        }
}
