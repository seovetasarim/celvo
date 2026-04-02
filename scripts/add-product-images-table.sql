CREATE TABLE IF NOT EXISTS product_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_path LONGTEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_product_images_product
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO product_images (product_id, image_path, sort_order)
SELECT p.id, p.image_path, 1
FROM products p
WHERE NOT EXISTS (
  SELECT 1 FROM product_images pi WHERE pi.product_id = p.id
);

CREATE INDEX idx_product_images_product ON product_images(product_id, sort_order);
