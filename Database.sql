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
  name VARCHAR(10) NOT NULL,
  precio DECIMAL(12,4) NOT NULL
);

-- producto en bodega --
CREATE TABLE almacen.bodega(
  subCursal VARCHAR(20) NOT NULL,
  Cod_producto VARCHAR(10) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (Cod_producto) REFERENCES almacen.producto(cod_producto),
  FOREIGN KEY (subCursal) REFERENCES shop.subCursal(nombre)
);

-- registro de estante --
CREATE TABLE almacen.estante(
  no_estante VARCHAR(10) NOT NULL PRIMARY KEY,
  subCursal VARCHAR(20) NOT NULL,
  cod_producto VARCHAR(10) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (cod_producto) REFERENCES almacen.producto(cod_producto),
  FOREIGN KEY (subcursal) REFERENCES shop.subCursal(nombre)
);

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

-- Producto vendido --
CREATE TABLE contador.producto_vendido(
  no_factura VARCHAR(10) NOT NULL,
  cod_producto VARCHAR(10) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (cod_producto) REFERENCES almacen.producto(cod_producto),
  FOREIGN KEY (no_factura) REFERENCES contador.factura(no_factura)
);

