import logo from '../assets/logo.png';

const Header = () => {
  return (
    <>
      <header className="w-full bg-white px-12 py-4 flex items-center shadow-lg">
        <div className="flex items-center gap-1">
          <img src={logo} alt="logo" className='w-3/4'/>
        </div>
      </header>

      <div className="w-full h-px bg-gray-200" />
    </>
  );
};

export default Header;
