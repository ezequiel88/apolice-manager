import { Cobertura } from "./Cobertura"
import { Segurado } from "./Segurado"

export type Apolice = {
  id: string
  numero: string | number
  valor_premio: string | number
  segurado: Segurado
  coberturas: Cobertura[]
}