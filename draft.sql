create database restaurant;
use restaurant;

create table pelanggan (
    id_pelanggan int PRIMARY KEY AUTO_INCREMENT,
    nama_pelanggan varchar(50) NOT NULL,
    alamat varchar(255) NOT NULL,
    nomor_telepon varchar(20) NOT NULL,
    email varchar(100)
);

create table karyawan (
    id_karyawan varchar(10) PRIMARY KEY,
    nama_karyawan varchar(50) NOT NULL,
    jabatan varchar(50) NOT NULL,
    gaji int NOT NULL,
    alamat_karyawan varchar(255) NOT NULL,
    nomor_telepon_karyawan varchar(20) NOT NULL
);

create table menu (
    id_menu varchar(10) PRIMARY KEY,
    nama_menu varchar(50) NOT NULL,
    kategori varchar(50) NOT NULL,
    harga int NOT NULL
);

create table pesanan (
    id_pesanan varchar(10) PRIMARY KEY,
    id_pelanggan int NOT NULL,
    id_karyawan varchar(10) NOT NULL,
    tangal_pesanan date NOT NULL,
    status_pesanan varchar(50) NOT NULL,
    total_harga_pesanan int NOT NULL,
    foreign key (id_pelanggan) references pelanggan(id_pelanggan),
    foreign key (id_karyawan) references karyawan(id_karyawan)
);

insert into pelanggan values (1, 'Dian Prasetyo', 'Jl. Mawar Indah', '81234567890', 'dian.prasetyo@email.com');
insert into karyawan values ('RP01', 'Rina Pratama', 'Manager', 10000000, 'Jl. Melati 5', '81234567890');
insert into pesanan values ('L1TB1', 1, 'RP01', '2023-11-14', 'DImasak', 50000);
insert into menu values ('FNG01', 'Nasi Goreng', 'Makanan', 250000);


//  query pesanan
SELECT 
    pesanan.id_pesanan, 
    pesanan.id_pelanggan,
    pelanggan.nama_pelanggan,
    pesanan.id_karyawan, 
    karyawan.nama_karyawan, 
    pesanan.tangal_pesanan, 
    pesanan.status_pesanan, 
    pesanan.total_harga_pesanan
FROM pesanan
INNER JOIN pelanggan ON pesanan.id_pelanggan = pelanggan.id_pelanggan
INNER JOIN karyawan ON pesanan.id_karyawan = karyawan.id_karyawan;

select * from pesanan
where id_pesanan = 'L1TB1';

select * from menu;

create table berisi (
    id_berisi int PRIMARY KEY AUTO_INCREMENT,
    id_pesanan varchar(10) NOT NULL,
    id_menu varchar(10) NOT NULL,
    foreign key (id_pesanan) references pesanan(id_pesanan),
    foreign key (id_menu) references menu(id_menu)
);

create table meja (
    id_meja varchar(10) PRIMARY KEY,
    nomor_meja int NOT NULL,
    kapasitas_meja int NOT NULL
);

update menu
set nama_menu = 'nasgor',
    kategori = 'minuman,
    harga = 48888,
    linkFoto = 'fjjaiej',
    deskripsi = 'slajfeaknfekl',
WHERE id_menu = 'MBTB2';
