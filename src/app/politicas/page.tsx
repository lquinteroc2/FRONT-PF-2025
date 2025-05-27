"use client"
import { useState } from "react"

export default function FiltroProductos() {
  const productos = [
    { nombre: "Camisa", color: "rojo", talla: "M" },
    { nombre: "Pantalón", color: "azul", talla: "L" },
    { nombre: "Camisa", color: "azul", talla: "S" },
    { nombre: "Falda", color: "negro", talla: "M" },
  ]

  const [filtroColor, setFiltroColor] = useState("")
  const [filtroTalla, setFiltroTalla] = useState("")

  const filtrados = productos.filter(p =>
    (filtroColor === "" || p.color === filtroColor) &&
    (filtroTalla === "" || p.talla === filtroTalla)
  )

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Filtrar productos</h2>

      <div className="flex gap-4">
        <select
          value={filtroColor}
          onChange={e => setFiltroColor(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Todos los colores</option>
          <option value="rojo">Rojo</option>
          <option value="azul">Azul</option>
          <option value="negro">Negro</option>
        </select>

        <select
          value={filtroTalla}
          onChange={e => setFiltroTalla(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Todas las tallas</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </div>

      <ul className="mt-4 space-y-2">
        {filtrados.length > 0 ? (
          filtrados.map((item, i) => (
            <li key={i} className="p-3 border rounded">
              {item.nombre} – Color: {item.color} – Talla: {item.talla}
            </li>
          ))
        ) : (
          <p>No hay productos que coincidan.</p>
        )}
      </ul>
    </div>
  )
}

