-- phpMyAdmin: ürünler var ama sitede görünmüyorsa (is_active NULL veya 0)
UPDATE products SET is_active = 1 WHERE is_active IS NULL OR is_active = 0;
