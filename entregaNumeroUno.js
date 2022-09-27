//Entrega numero 1: Clases//

class Usuario {
    nombre; 
    apellido;
    libros;
    mascotas;


    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [libros];
        this.mascotas = [mascotas];
    }

     getFullName = () =>{
        console.log(`Hola mi nombre es ${this.nombre} y mi apellido es ${this.apellido}`)
    }

   addMascota = (nombreMascota) =>{
    this.mascotas.push(nombreMascota)

    }

  countMascotas = () => {
    console.log(this.mascotas.length)

    }

  addBook = (name, author) => {
    this.libros.push({nombre:`${name}`, autor:`${author}`})

    }

    getBookNames = () => {
        if(this.libros.length > 0){
            let books = this.libros.map((book)=> book.nombre);
            console.log(books)
        }

        else{
            console.log("No hay libros agregados.")
        }
        

    }
}

const usuario1 = new Usuario("Luis", "Morandi", {nombre:"100 años de soledad", autor: "GGM"}, "honey")

console.log(usuario1)

usuario1.getFullName()
usuario1.addMascota("max")
usuario1.countMascotas()
usuario1.addBook("el seños de los anillos", "tolkien" )
usuario1.getBookNames()

console.log(usuario1)
