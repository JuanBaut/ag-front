import type React from "react"
import type { DetailType } from "@/redux/actions/mangrullosActions"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getIdMangrullos } from "@/redux/action-creators/mangrullos/getIdMangrullos"
import { useEffect } from "react"
import DetailActividad from "@/features/Actividades/DetailActividad"

const DetailMangrullo: React.FC = () => {
  const detail: DetailType = useAppSelector(
    state => state.mangrullosReducer.detail,
  )
  const dispatch = useAppDispatch()

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    try {
      dispatch(getIdMangrullos(Number(id)))
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }, [dispatch, id])

  return (
    <div>
      <Link to={`/mangrullos`}>
        <button className="flex text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 bg-transparent hover:bg-accent font-semibold py-2 px-4 border rounded">
          Ir atrás
        </button>
      </Link>

      {detail ? (
        <div>
          <p className="text-2xl bold capitalize">{detail.zone}</p>
          <p>Peligrosidad: {detail.dangerousness}</p>
          <p>Calificación: {detail.qualification}</p>
          <p>Estado: {detail.state}</p>
          {/* <p>Descripcion: {detail.}</p> HAY QUE MODIFICAR EL MODELO PARA QUE EXISTA LA PROPIEDAD DESCRIPCIÓN */}
          <img className="size-44" src={detail.image} alt="Imagen de playa" />
        </div>
      ) : null}
      {detail.activity && <DetailActividad activity={detail.activity} />}
    </div>
  )
}

export default DetailMangrullo