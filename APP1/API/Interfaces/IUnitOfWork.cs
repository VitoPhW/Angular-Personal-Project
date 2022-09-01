using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
         IUserRepository UserRepository { get; }
         IProductRepository ProductRepository { get; }
         ICategoryRepository CategoryRepository { get; }
         ILikeRepository LikeRepository { get;  }
         IShoppingCartRepository ShoppingCartRepository { get;  }

         Task<bool> Complete();
         bool HasChanges();

    }
}