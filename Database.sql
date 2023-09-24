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
  user VARCHAR(9) NOT NULL PRIMARY KEY,
  password VARCHAR(10) NOT NULL,
  name VARCHAR(50) NOT NULL,
  rol VARCHAR(3) NOT NULL,
  subCursal VARCHAR(20) NOT NULL,
  estado BOOLEAN NOT NULL,
  FOREIGN KEY (subCursal) REFERENCES shop.subCursal(nombre)
);

CREATE TABLE usuario.tarjeta(
    no_card VARCHAR(10) NOT NULL PRIMARY KEY,
    tipo VARCHAR(5) NOT NULL,
    puntos DECIMAL(12,4) NOT NULL,
    acumulado DECIMAL(12,4) NOT NULL
);

CREATE TABLE usuario.cliente(
    nit VARCHAR(10) NOT NULL PRIMARY KEY,
    nombre VARCHAR(25) NOT NULL,
    no_card VARCHAR(10) NOT NULL,
    FOREIGN KEY (no_card) REFERENCES usuario.tarjeta(no_card)
);

-- Asigna una caja a un empleado.cajero -- 
CREATE TABLE shop.caja (
  user_empleado VARCHAR(9) NOT NULL PRIMARY KEY,
  --cod_cajero VARCHAR(9) NOT NULL PRIMARY KEY, --FORANEA Y PRIMARIA
  no_caja VARCHAR(5) NOT NULL,
  FOREIGN KEY (user_empleado) REFERENCES personal.empleado(user)
);

INSERT INTO shop.caja VALUES ('24876', 'A-1','24876');


-- ingreso de porducto --
CREATE TABLE almacen.producto(
  Cod_producto VARCHAR(8) NOT NULL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  precio DECIMAL(12,4) NOT NULL
);
-- producto en bodega --
CREATE TABLE almacen.bodega(
  subCursal VARCHAR(20) NOT NULL PRIMARY KEY,
  Cod_producto VARCHAR(10) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (Cod_producto) REFERENCES almacen.producto(cod_producto),
);
-- registro de estante --
CREATE TABLE almacen.estante(
  subCursal VARCHAR(20) NOT NULL PRIMARY KEY,
  cod_producto VARCHAR(10) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (cod_producto) REFERENCES almacen.producto(cod_producto)
);
-- factura --
CREATE TABLE contador.factura(
  no VARCHAR(10) NOT NULL PRIMARY KEY,
  user_empleado VARCHAR(10) NOT NULL,
  nit VARCHAR(10) NOT NULL,
  total DECIMAL(12,4) NOT NULL,
  total_descuento DECIMAL(12,4) NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (user_empleado) REFERENCES almacen.producto(cod_producto)
);

-- Producto vendido --
CREATE TABLE contador.producto_vendido(
  cod VARCHAR(8) NOT NULL PRIMARY KEY,
  cod_producto VARCHAR(10) NOT NULL,
  factura VARCHAR(10) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (cod_producto) REFERENCES almacen.producto(cod_producto)
);

    -- Producto vendido --
CREATE TABLE usuario.clientes(
  Nit VARCHAR(9) PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  Email VARCHAR(40) NOT NULL
);

CREATE TABLE contador.ventas(
  Id VARCHAR(9) NOT NULL PRIMARY KEY,
  Fecha DATE NOT NULL,
  Nit VARCHAR(9) NOT NULL UNIQUE,
  CodProduct VARCHAR(9) NOT NULL,
  FOREIGN KEY (Nit) REFERENCES usuario.clientes(Nit),
  FOREIGN KEY (CodProduct) REFERENCES bodega.productos(CodProducto)
);
