import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
import CarouselLoading from "../Mangrullos/loading-states/carousel-loading"
import { Skeleton } from "@/components/ui/skeleton"

const CarouselActividades: React.FC = () => {
  const actividades = useAppSelector(
    state => state.actividadesReducer.actividades,
  )

  const [loading, setLoading] = useState(true)
  const [imgLoading, setImgLoading] = useState(true)

  useEffect(() => {
    if (actividades && actividades.length > 0) {
      setLoading(false)
    }
  }, [actividades, imgLoading])

  const handleImageLoad = () => {
    setImgLoading(false)
  }

  return (
    <Carousel className="max-w-xl">
      <CarouselContent>
        {loading ? (
          <CarouselLoading />
        ) : (
          actividades.map(actividad => (
            <CarouselItem key={actividad.id}>
              <Card className="pt-6 rounded">
                <CardContent>
                  <div className="flex">
                    <div className="rounded aspect-[4/3] max-w-sm overflow-hidden">
                      {imgLoading ? (
                        <Skeleton className="object-cover aspect-[4/3] w-96" />
                      ) : null}
                      <img
                        onLoad={handleImageLoad}
                        className="object-cover aspect-[4/3] max-w-sm"
                        src={actividad.image}
                        alt="Imagen Mangrullos"
                      />
                    </div>
                    <div className="pl-6 w-sm">
                      <CardTitle>Zona destacada {actividad.id}</CardTitle>
                      <p>{actividad.activityName}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselActividades
