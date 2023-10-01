CREATE DATABASE webSiteShop;

CREATE SCHEMA shop;
CREATE SCHEMA almacen;
CREATE SCHEMA personal;
CREATE SCHEMA usuario;
CREATE SCHEMA contador;

-- entidad subcursal --
CREATE TABLE shop.subCursal(
  nombre VARCHAR(20) NOT NULL PRIMARY KEY
);
INSERT INTO shop.subCursal(nombre) VALUES ('CENTRAL');
INSERT INTO shop.subCursal(nombre) VALUES ('NORTE');
INSERT INTO shop.subCursal(nombre) VALUES ('SUR');

-- empleado Cajero, Bodega, Inventario, Administrador -- 
CREATE TABLE personal.empleado (
  usuario VARCHAR(9) NOT NULL PRIMARY KEY,
  password VARCHAR(10) NOT NULL,
  name VARCHAR(50) NOT NULL,
  rol VARCHAR(3) NOT NULL,
  subCursal VARCHAR(20) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  FOREIGN KEY (subCursal) REFERENCES shop.subCursal(nombre)
);
INSERT INTO personal.empleado(usuario, password, name, rol, subCursal, estado) VALUES 
('caj1', '1234', 'Edgar Gonzales', 'caj','CENTRAL','1'),
('caj2', '1234', 'Brandon Gonzales', 'caj','NORTE','1'), 
('caj3', '1234', 'Emily Gonzales', 'caj','SUR','1');

INSERT INTO personal.empleado (usuario, password, name, rol, subCursal, estado) VALUES
  ('caj4', '1234', 'John Doe', 'caj', 'CENTRAL', '1'),
  ('caj5', '1234', 'Jane Smith', 'caj', 'NORTE', '1'),
  ('caj6', '1234', 'Bob Johnson', 'caj', 'SUR', '1');

INSERT INTO personal.empleado (usuario, password, name, rol, subCursal, estado)
VALUES
  ('bodeg1', '1234', 'Johns Doe', 'bod', 'CENTRAL', '1'),
  ('bodeg2', '1234', 'Janes Smith', 'bod', 'NORTE', '1'),
  ('bodeg3', '1234', 'Bobs Johnson', 'bod', 'SUR', '1');

INSERT INTO personal.empleado(usuario, password, name, rol, subCursal, estado) VALUES 
('inven1', '1234', 'Edgars Gonzales', 'inv','CENTRAL','1'),
('inven2', '1234', 'Brandons Gonzales', 'inv','NORTE','1'), 
('inven3', '1234', 'Emilys Gonzales', 'inv','SUR','1');



CREATE TABLE usuario.tarjeta(
    no_card VARCHAR(10) NOT NULL PRIMARY KEY,
    tipo VARCHAR(5) NOT NULL,
    puntos DECIMAL(12,4) NOT NULL,
    acumulado DECIMAL(12,4) NOT NULL
);

CREATE TABLE usuario.cliente(
    nit VARCHAR(10) NOT NULL PRIMARY KEY,
    nombre VARCHAR(25) NOT NULL,
    no_card VARCHAR(10),
    FOREIGN KEY (no_card) REFERENCES usuario.tarjeta(no_card)
);

-- Asigna una caja a un empleado.cajero -- 
CREATE TABLE personal.caja (
  user_empleado VARCHAR(9) NOT NULL,
  --cod_cajero VARCHAR(9) NOT NULL PRIMARY KEY, --FORANEA Y PRIMARIA
  no_caja VARCHAR(5) NOT NULL,
  FOREIGN KEY (user_empleado) REFERENCES personal.empleado(usuario)
);

INSERT INTO shop.caja VALUES ('24876', 'A-1','24876');


-- ingreso de porducto --
CREATE TABLE almacen.producto(
  Cod_producto VARCHAR(8) NOT NULL PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  precio DECIMAL(12,4) NOT NULL
);
-- UPDATE PRODUCT --
UPDATE almacen.producto SET name='Sweater1', precio='424.5691' WHERE cod_producto='prod75';
--insert of the product --
DO $$
DECLARE
nameProduct TEXT[] := ARRAY[
  'T-shirt','Jeans','Sneakers','Backpack','Wristwatch','Sunglasses','Dress','Hoodie','Running Shoes','Phone Case','Headphones','Laptop','Camera','Fitness Tracker',
  'Water Bottle','Coffee Maker','Toaster','Blender','Pillow','Blanket','Towel Set','Shampoo','Conditioner','Toothbrush','Toothpaste','Deodorant','Soap','Dish Soap','Laundry Detergent',
  'Trash Bags','Cleaning Supplies','Vacuum Cleaner','Microwave','Refrigerator','Couch','Coffee Table','Dining Table','Dining Chairs','Bed','Nightstand','Desk',
  'Office Chair','Bookshelf','Printer','Paper','Pen Set','Markers','Notebook','Backpack','Lunchbox','Baby Clothes','Diapers','Baby Bottles','Baby Monitor','Stroller','Car Seat',
  'Pet Food','Pet Toys','Dog Leash','Cat Litter','Fish Tank','Hammock','Grill','Cookware Set','Cutlery Set','Food Processor','Blender','Kitchen Scale','Bed Sheets','Towels',
  'Pajamas','Slippers','Umbrella','Raincoat','Sweater','Scarf','Gloves','Winter Boots','Luggage','Suitcase',
  'Carry-On Bag','Backpack','Hiking Boots','Tent','Sleeping Bag','Flashlight','Bike','Helmet','Lock','Water Bottle','Ski Jacket','Snowboard','Snow Gloves','Ski Goggles','Snow Pants','Winter Hat','Thermal Socks','Hiking Boots','Trekking Poles','Camping Tent','Sleeping Pad','Climbing Harness',
  'Rope','Climbing Shoes','Climbing Helmet','Climbing Chalk','Yoga Mat','Resistance Bands','Kettlebell','Jump Rope','Running Shorts','Yoga Pants','Swimwear','Sunscreen',
  'Beach Towel','Sunglasses','Beach Chair','Cooler','Picnic Basket','Fishing Rod','Tackle Box','Camping Stove','Sleeping Bag','First Aid Kit','Binoculars','Telescope','Board Game','Puzzle',
  'Video Game Console','Controller','Board Game','Playing Cards','Chess Set','Painting Supplies','Art Easel','Knitting Kit','Craft Supplies','Candles','Home Decor','Plant','Vase','Photo Frame','Candles','Wall Clock','Mirror','Lamp','Curtains','Rug',
  'Throw Pillow','Plant Stand','Shower Curtain','Towel Rack','Soap Dispenser','Toothbrush Holder','Wall Shelves','Cookbook','Wine Glasses','Barbecue Grill','Patio Furniture','Garden Tools','Outdoor Lights','Fire Pit','Hammock','Sun Umbrella'];

nombre TEXT;
cod TEXT;
precio NUMERIC;

BEGIN
  FOR i IN 1..150 LOOP
    cod := 'prod'|| i;
    nombre := nameProduct[i];
    precio := (random() * 500)+1;

    IF nombre IS NOT NULL THEN
      EXECUTE 'INSERT INTO almacen.producto(Cod_producto,name,precio) VALUES ($1,$2,$3)' USING cod,nombre,precio;
    END IF;
  END LOOP;
END $$;

-- producto en bodega --
CREATE TABLE almacen.bodega(
  subCursal VARCHAR(20) NOT NULL,
  Cod_producto VARCHAR(10) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (Cod_producto) REFERENCES almacen.producto(cod_producto),
  FOREIGN KEY (subCursal) REFERENCES shop.subCursal(nombre)
);
SELECT * FROM almacen.producto INNER JOIN almacen.bodega ON almacen.producto.cod_producto = almacen.bodega.cod_producto WHERE almacen.bodega.subcursal = 'CENTRAL';

SELECT * FROM almacen.producto FULL JOIN almacen.bodega ON almacen.producto.cod_producto = almacen.bodega.cod_producto WHERE almacen.bodega.cod_producto = 'prod200' AND almacen.bodega.subcursal = 'CENTRAL'; 
-- regitro de producto a la bodega SUBCURSAL SUR,CENTRAL,NORTE -- 
DO $$
DECLARE

subCursal1 TEXT;
subCursal2 TEXT;
subCursal3 TEXT;
num1 NUMERIC;
num2 NUMERIC;
cod TEXT;
cod1 TEXT;
cod2 TEXT;
BEGIN
  FOR i IN 1..75 LOOP
    subCursal1 := 'SUR';
    subCursal2 := 'CENTRAL';
    subCursal3 := 'NORTE';
    cod := 'prod'||i;
    num1 := i+74;
    cod1 := 'prod'|| num1;
    num2 := i+34;
    cod2 := 'prod'|| num2;
    EXECUTE 'INSERT INTO almacen.bodega(subcursal,cod_producto,cantidad) VALUES ($1,$2,floor(random() * 10) + 1)' USING subCursal1,cod;
    EXECUTE 'INSERT INTO almacen.bodega(subcursal,cod_producto,cantidad) VALUES ($1,$2,floor(random() * 10) + 1)' USING subCursal2,cod1;
    EXECUTE 'INSERT INTO almacen.bodega(subcursal,cod_producto,cantidad) VALUES ($1,$2,floor(random() * 10) + 1)' USING subCursal3,cod2;
  END LOOP;
END $$;

-- registro de estante --
CREATE TABLE almacen.estante(
  subCursal VARCHAR(20) NOT NULL,
  cod_producto VARCHAR(10) NOT NULL,
  no_pasillo VARCHAR(5) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (cod_producto) REFERENCES almacen.producto(cod_producto),
  FOREIGN KEY (subcursal) REFERENCES shop.subCursal(nombre)
);

-- registro de producto a estante SUBCURSAL CENTRAL--
DO $$
DECLARE
  subcursal1 TEXT;
  cod TEXT;
BEGIN
  FOR i IN 75..150 LOOP
    subcursal1 := 'CENTRAL';
    cod := 'prod'||i;
    EXECUTE  'INSERT INTO almacen.estante(subCursal, cod_producto, no_pasillo, cantidad) VALUES ($1,$2,floor(random() * 100) + 1,floor(random() * 10) + 1)' USING subcursal1,cod;
  END LOOP;
END $$;

-- registro de producto a estante SUBCURSAL SUR,CENTRAL,NORTE--
DO $$
DECLARE
  subcursal1 TEXT;
  subcursal2 TEXT;
  subcursal3 TEXT;
  num1 NUMERIC;
  num2 NUMERIC;
  cod TEXT;
  cod1 TEXT;
  cod2 TEXT;
BEGIN
  FOR i IN 1..75 LOOP
    subcursal1 := 'SUR';
    subcursal2 := 'CENTRAL';
    subcursal3 := 'NORTE';
    cod := 'prod'||i;
    num1 := i+74;
    cod1 := 'prod'|| num1;
    num2 := i+34;
    cod2 := 'prod'|| num2;
    EXECUTE  'INSERT INTO almacen.estante(subCursal, cod_producto, no_pasillo, cantidad) VALUES ($1,$2,floor(random() * 100) + 1,floor(random() * 10) + 1)' USING subcursal1,cod;
    EXECUTE  'INSERT INTO almacen.estante(subCursal, cod_producto, no_pasillo, cantidad) VALUES ($1,$2,floor(random() * 100) + 1,floor(random() * 10) + 1)' USING subcursal2,cod1;
    EXECUTE  'INSERT INTO almacen.estante(subCursal, cod_producto, no_pasillo, cantidad) VALUES ($1,$2,floor(random() * 100) + 1,floor(random() * 10) + 1)' USING subcursal3,cod2;
  END LOOP;
END $$;

-- factura --
CREATE TABLE contador.factura(
  no_factura VARCHAR(10) NOT NULL PRIMARY KEY,
  user_empleado VARCHAR(9) NOT NULL,
  nit VARCHAR(10) NOT NULL,
  total DECIMAL(12,4) NOT NULL,
  total_descuento DECIMAL(12,4) NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (user_empleado) REFERENCES personal.caja(user_empleado),
  FOREIGN KEY (nit) REFERENCES usuario.cliente(nit)
);

-- insertar factura -- 


-- Producto vendido --
CREATE TABLE contador.producto_vendido(
  no_factura VARCHAR(10) NOT NULL,
  cod_producto VARCHAR(10) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (cod_producto) REFERENCES almacen.producto(cod_producto),
  FOREIGN KEY (no_factura) REFERENCES contador.factura(no_factura)
);

