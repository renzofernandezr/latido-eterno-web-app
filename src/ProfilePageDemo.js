import React, { useState, useEffect } from 'react';
import CommentCard from './Componentes/comentario';
import { useParams, Navigate } from 'react-router-dom';
import EscribirComentario from './PopUps/EscribirComentario_pop';
import './Css/ProfilePageV2.css';


const ProfilePageDemo = () => {
  const logoSrc = `${process.env.PUBLIC_URL}/logoh.png`;
  const PeruSrc = `${process.env.PUBLIC_URL}/flag-of-Peru.jpg`;
  const ProfileSrc = `${process.env.PUBLIC_URL}/profile1.jpg`;
  const BannerSrc = `${process.env.PUBLIC_URL}/banner3.jpg`;

  // const bannerSrc = `${process.env.PUBLIC_URL}/banner.jpg`;
  // const profilePicSrc = `${process.env.PUBLIC_URL}/profile.jpg`;
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State for comment modal
  const [toggle, setToggle] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ url: '', description: '', fecha_creacion: '' });
  const { uid } = useParams();
  const [memberData, setMemberData] = useState(null);
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const staticImages = [
    { id: 1, url: `${process.env.PUBLIC_URL}/img1.jpg`, description: 'Image 1', fecha_creacion: '2023-01-01' },
    { id: 2, url: `${process.env.PUBLIC_URL}/img2.jpg`, description: 'Image 2', fecha_creacion: '2023-01-02' },
    { id: 3, url: `${process.env.PUBLIC_URL}/img3.jpg`, description: 'Image 3', fecha_creacion: '2023-01-03' },
    { id: 4, url: `${process.env.PUBLIC_URL}/img4.jpg`, description: 'Image 4', fecha_creacion: '2023-01-04' },
    { id: 5, url: `${process.env.PUBLIC_URL}/img5.jpg`, description: 'Image 5', fecha_creacion: '2023-01-05' },
    { id: 6, url: `${process.env.PUBLIC_URL}/img6.jpg`, description: 'Image 6', fecha_creacion: '2023-01-06' },
    { id: 7, url: `${process.env.PUBLIC_URL}/img7.jpg`, description: 'Image 7', fecha_creacion: '2023-01-07' },
    { id: 8, url: `${process.env.PUBLIC_URL}/img8.jpg`, description: 'Image 8', fecha_creacion: '2023-01-08' },
    { id: 9, url: `${process.env.PUBLIC_URL}/img9.jpg`, description: 'Image 9', fecha_creacion: '2023-01-09' },
    { id: 10, url: `${process.env.PUBLIC_URL}/img10.jpg`, description: 'Image 10', fecha_creacion: '2023-01-10' },
  ];

  function updateToggle(id) {
    setToggle(id);
  }
  function openModal(item) {
    setModalContent({ url: item.url, description: item.descripcion, fecha_creacion: item.fecha_creacion });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling
}
  function closeModal() {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }

  function openCommentModal() {
    setIsCommentModalOpen(true);
  }

  function closeCommentModal() {
    setIsCommentModalOpen(false);
  }

  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const month = months[date.getMonth()]; // Get the first 3 letters of the month
  
    return `${day} ${month}. ${year}`;
  };

  

  return (
    <div className="min-h-screen flex flex-col bg-white md:bg-gray-100">
      <header className="w-full h-14 md:h-20 flex justify-center md:justify-between items-center bg-white fixed top-0 z-50 shadow-md px-4 md:px-20">
        <div className="flex-grow md:flex-grow-0 flex justify-center">
          <img src={logoSrc} alt="Logo" className="h-11 md:h-16"/>
        </div>
        <div className="hidden md:flex items-center space-x-10 mr-20">
          <p className="block text-center text-white py-2 hover:cursor-pointer rounded-full bg-black p-3">
            <i className="far fa-share text-xl"></i>
            <span className="ml-2">Compartir</span>
          </p>
          <a href='https://www.latidoeterno.com/'>
            <p className="block text-center text-white py-2 hover:cursor-pointer rounded-full bg-black p-3">
              <i className="far fa-home text-xl"></i>
              <span className="ml-2">Tienda</span>
            </p>
          </a>
          <p className="block text-center text-white py-2 hover:cursor-pointer rounded-full bg-rojo p-3">
            <i className="far fa-sign-in-alt text-xl"></i>
            <span className="ml-2">Ingresar</span>
          </p>
        </div>
      </header>
      
      <div className="w-full flex flex-col items-center px-0 mt-14 md:mt-28">
        <div className="w-full max-w-6xl bg-white md:shadow-lg relative text-center md:text-left md:rounded-lg">
          <img src={BannerSrc} alt="Banner" className="w-full md:rounded-t-lg" />
          <img  src={ProfileSrc} alt="Profile" className="rounded-full border-6 border-white absolute left-1/2 md:left-32 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36" />
          <h2 className="text-3xl text-black poppins mt-20 md:mt-6 md:mx-60 mx-10">Margarita Rivera Zapata</h2>
          <p className="text-base text-gray-400 mx-16 my-3 italic transform md:mx-60 "></p>
          <div className="flex justify-center md:justify-start mt-4 md:mx-60 md:mb-10">
            <img src={PeruSrc} alt="Country Flag" className="w-auto h-6 mr-2 rounded-md" />
            <p className="text-base">Piura, Peru</p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center px-0 mt-0 md:mt-6">
        <div className="w-full max-w-6xl bg-white md:shadow-lg relative text-center md:text-left md:rounded-lg">

      <div className="my-5">
      <ul className="flex flex-wrap items-center justify-center text-black space-x-10">
        <li className={toggle === 1 ? 'selected' : ''} onClick={() => updateToggle(1)}>Mi Historia</li>
        <li className={toggle === 2 ? 'selected' : ''} onClick={() => updateToggle(2)}>Contenido</li>
        <li className={toggle === 3 ? 'selected' : ''} onClick={() => updateToggle(3)}>Comentarios</li>
      </ul>
      <div className="slate-line"></div>

      <div className={toggle === 1  ? "show-content": "content"}>
        <p class="text-center">26/01/1940 - 30/05/2023</p>
        <p class='mt-3 px-12 pt-0 text-justify whitespace-pre-wrap pb-20 md:pb-10'>Querida abuela,
Hace un año que te fuiste de nuestro lado, pero tu presencia sigue viva en cada rincón de mi corazón. Tu partida dejó un vacío imposible de llenar, pero tus recuerdos llenan cada día mi alma de amor y gratitud.
Desde mi infancia, fuiste mi faro, mi confidente y mi inspiración. Tus consejos sabios y tu ternura incondicional guiaron mis pasos y me enseñaron el verdadero significado del amor y la bondad.
Recuerdo con cariño nuestras tardes juntas, donde compartíamos risas, historias y secretos. Tu sonrisa iluminaba mis días y tu abrazo era mi refugio en los momentos difíciles. Cada instante a tu lado fue un regalo invaluable que atesoro en lo más profundo de mi ser.
Tu partida dejó un hueco en nuestras vidas que nadie más podrá llenar. Pero, aunque ya no estés físicamente entre nosotros, tu legado perdura en cada uno de nosotros. Tus valores, tu fuerza y tu amor incondicional nos guían y nos sostienen en los momentos de tribulación.
</p>
      </div>

      <div className={toggle === 2  ? "show-content": "content"}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-12 mt-3 pb-20 md:pb-10">
      {staticImages.map((item) => (
          <div key={item.id} className="bg-gray-200 cursor-pointer rounded-lg overflow-hidden relative" 
          style={{ paddingTop: '100%' }} onClick={() => openModal(item)}>
          <img src={item.url} alt={item.description} className="absolute top-0 left-0 w-full h-full object-cover rounded-md" />
        </div>
    ))}
  </div>
      </div>

      <div className={toggle === 3 ? "show-content" : "content"}>
      <div className="flex justify-center mt-6 mb-4">
          <button
    className="bg-rojo hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    onClick={openCommentModal} // Open the modal when the button is clicked
          >
            + Agregar Comentario
          </button>
          </div>
          <div className="pb-10 pr-10 pl-10 text-left ">
          <CommentCard showButtons={false} />

</div>
      </div>
    </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="md:hidden fixed inset-x-0 bottom-0 bg-white" style={{ boxShadow: '1px -1px 4px 0px rgba(88,88,88,0.19)' }}>
  <div className="flex justify-around">
    <p className="block text-center text-black py-2">
      <i className="far fa-share text-rojo text-2xl"></i>
      <span className="block text-xs">Compartir</span>
    </p>
    <a className='block text-center text-black py-2' href="https://www.latidoeterno.com/">
      <i className="far fa-home text-rojo text-2xl"></i>
      <span className="block text-xs">Tienda</span>
    </a>
    <p className="block text-center text-black py-2">
      <i className="far fa-sign-in-alt text-rojo text-2xl"></i>
      <span className="block text-xs">Ingresar</span>
    </p>
  </div>
</div>
{isModalOpen && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeModal}>
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-screen-md max-h-screen-md overflow-auto" onClick={e => e.stopPropagation()}>
      <span className="absolute top-0 right-0 cursor-pointer text-gray-500 hover:text-gray-700" onClick={closeModal}>&times;</span>
      {modalContent.url.endsWith('.mp4') ? (
        <video controls className="mb-4 w-full" style={{ maxWidth: '100%' }}>
          <source src={modalContent.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={modalContent.url} alt="Media" className="mb-4" style={{ maxWidth: '100%', maxHeight: '70vh' }} />
      )}
      <p>{modalContent.description}</p>
      <p>{new Date(modalContent.fecha_creacion).toLocaleDateString('es-ES')}</p>
    </div>
  </div>
)}
 {isCommentModalOpen && (
        <EscribirComentario onClose={closeCommentModal} /> //  component when isCommentModalOpen is true
      )}
    </div>    
  );
};

export default ProfilePageDemo;
