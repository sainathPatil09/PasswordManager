
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {

  return (
    <>
      {/* <div> */}
        <Navbar />
        <div className="pb-4 inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <Manager />
        </div>
        {/* <div className='min-h-[87.5vh]'>
        </div> */}
        <Footer className="absolute bottom-0" />
      {/* </div> */}
    </>
  )
}

export default App
