//src/components/PrivacyPolicy.jsx
'use client'

//IMPORTS REACT/NEXT:
import {useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
//IMPORTS DEPENDENCIES:
import {motion} from 'framer-motion';
//IMPORTS CONTEXT:
import { useGlobalState } from "@/context/GlobalStateContext";
//IMPORTS HOOKS:
import { fadeIn } from '../../lib/variants'
//IMPORTS COMPONENTS:
//IMPORTS IMAGES:
//IMPORTS STYLES:



function PrivacyPolicy() {


    const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('privacyPolicyAccepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    setIsVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    isVisible && (
      <>
        <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-primary p-8 shadow-md rounded-t-md w-full flex flex-col sm:flex-row sm:justify-center sm:items-center gap-[20px]">
            <div className="w-[100%] sm:w-[80%]">
              <h2 className="text-lg font-oswald font-bold text-white text-shadow mb-4 underline decoration-2 underline-offset-8">
                Política de Privacidad:
              </h2>
              <p className="text-lg font-roboto font-bold text-white">
                Al proporcionar su correo electrónico, acepta recibir comunicaciones por correo
                electrónico sobre actualizaciones, promociones y otra información relacionada con
                nuestros servicios. Nos comprometemos a proteger su información personal y a
                utilizarla únicamente de acuerdo con nuestra política de privacidad.
              </p>
              <p className="text-lg font-roboto font-bold text-white">
                Para más información, consulte nuestra{' '}
                <button
                  onClick={handleOpenModal}
                  className="text-btnBgColor underline"
                >
                  Política de Privacidad
                </button>.
              </p>
            </div>
            <div className="w-[100%] sm:w-[20%] flex justify-center items-center">
              <button
                onClick={handleAccept}
                className="w-[150px] h-[40px] mt-4 text-white px-4 py-2 btn btn-lg btn-accent rounded transition-all duration-300"
              >
                Acepto
              </button>
            </div>
          </div>
        </div>

        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-primary p-6 rounded-lg shadow-lg max-w-[90%] md:max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-4 text-white">Política de Privacidad</h2>
              <div className="h-[60vh] overflow-y-auto text-white">
                {/* Contenido de la política de privacidad */}
                <p>
                    <strong>Política de Privacidad</strong><br/>
                    En [Nombre de la Empresa], nos comprometemos a proteger y respetar su privacidad. Esta política de privacidad explica cómo recopilamos, utilizamos y protegemos su información personal cuando usted se suscribe a nuestra lista de difusión por correo electrónico.
                    <br/><br/>
                    <strong>Información que Recopilamos</strong><br/>
                    La única información personal que recopilamos de usted es su dirección de correo electrónico, la cual nos proporciona al suscribirse a nuestra lista de difusión.
                    <br/><br/>
                    <strong>Uso de su Información</strong><br/>
                    Utilizamos su dirección de correo electrónico para los siguientes propósitos:
                    <br/><br/>
                    Envío de Boletines Informativos: Le enviaremos correos electrónicos periódicos con información sobre nuestros servicios, promociones, y actualizaciones.
                    Gestión de Suscripciones: Mantenemos un registro de su suscripción para asegurar que solo reciba correos electrónicos de nuestra parte si así lo desea.
                    <br/><br/>
                    <strong>Base Legal para el Procesamiento</strong><br/>
                    El procesamiento de su dirección de correo electrónico se basa en su consentimiento. Puede retirar su consentimiento en cualquier momento haciendo clic en el enlace de "Darse de baja" que se encuentra en la parte inferior de cada correo electrónico que enviamos o contactándonos directamente en [dirección de correo electrónico de contacto].
                    <br/><br/>
                    <strong>Retención de Datos</strong><br/>
                    Mantendremos su dirección de correo electrónico en nuestra base de datos hasta que usted decida darse de baja de nuestra lista de difusión. Una vez que se haya dado de baja, eliminaremos su información de nuestra base de datos.
                    <br/><br/>
                    <strong>Derechos del Usuario</strong><br/>
                    Usted tiene los siguientes derechos respecto a su información personal:
                    <br/><br/>
                    Derecho de Acceso: Puede solicitar una copia de la información personal que tenemos sobre usted.<br/>
                    Derecho de Rectificación: Puede solicitar que corrijamos cualquier información inexacta o incompleta.<br/>
                    Derecho de Supresión: Puede solicitar que eliminemos su información personal.
                    Derecho a la Restricción del Procesamiento: Puede solicitar que restrinjamos el procesamiento de su información personal.<br/>
                    Derecho a la Portabilidad de los Datos: Puede solicitar que transfiramos su información personal a otra organización.<br/>
                    Derecho a Oponerse: Puede oponerse al procesamiento de su información personal en ciertos casos.<br/>
                    Para ejercer cualquiera de estos derechos, por favor contacte con nosotros en [dirección de correo electrónico de contacto].
                    <br/><br/>

                    <strong>Seguridad de la Información</strong><br/>
                    Tomamos medidas razonables para proteger su información personal contra pérdida, uso indebido y acceso no autorizado, divulgación, alteración y destrucción. Sin embargo, ninguna transmisión de datos por Internet o sistema de almacenamiento de datos puede garantizarse como 100% segura.
                    <br/><br/>
                    <strong>Cambios en esta Política de Privacidad</strong><br/>
                    Podemos actualizar esta política de privacidad de vez en cuando. Le notificaremos sobre cualquier cambio publicando la nueva política de privacidad en nuestro sitio web. Se recomienda revisar esta página periódicamente para estar al tanto de cualquier cambio.
                    <br/><br/>
                    <strong>Contacto</strong><br/>
                    Si tiene alguna pregunta sobre esta política de privacidad o sobre nuestras prácticas de privacidad, por favor contacte con nosotros en [dirección de correo electrónico de contacto].
                    <br/><br/>
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-[150px] h-[40px] mt-4 bg-btnBgColor text-white px-4 py-2 rounded btn btn-lg btn-accent transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}

export default PrivacyPolicy;