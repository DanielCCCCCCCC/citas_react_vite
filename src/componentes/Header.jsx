function Header(props) {
  console.log(props);
  return (
    <>
      <div className="w-full flex justify-center ">
        <h1
          className="font-black text-5xl     max-lg:w-1/2 
                 mb-0 mt-10 pt-5"
        >
          Seguimiento Pacientes{" "}
          <span className="text-indigo-600">Veterinaria</span>
        </h1>
      </div>
    </>
  );
}

export default Header;
