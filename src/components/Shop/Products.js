import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_PRODUCTS=[
  {
    id:'p1',
    price:6,
    title:'My First Book',
    description:'The First book i ever wrote'
  },
  {
    id: 'p2',
    price: 5,
    title: 'My Second Book',
    description: 'The Second book i ever wrote'
  },
  {
    id: 'p3',
    price: 10,
    title: 'My Famous Book',
    description: 'The Famous book i ever wrote'
  },
  {
    id: 'p4',
    price: 2,
    title: 'My last Book',
    description: 'The last book'
  }
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product=>(
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
