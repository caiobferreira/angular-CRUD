import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

 
  product!: Product;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      throw Error
    }
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    })
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      throw Error
    }
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage('Delete successful');
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
