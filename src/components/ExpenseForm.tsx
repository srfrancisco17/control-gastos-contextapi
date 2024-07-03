import { categories } from "../data/categories";

import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { useState } from "react";
import { DraftExpense } from "../types";


export default function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  return (
    <form className="space-y-5">
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
      >
        Nuevo gasto
      </legend>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
        <input value={expense.expenseName} type="text" id="expenseName" placeholder="Anade nombre del gasto" className="bg-slate-100 p-2" name="expenseName" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Cantidad:</label>
        <input value={expense.amount} type="number" id="amount" placeholder="Anade la cantidad del gasto" className="bg-slate-100 p-2" name="amount" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Categoria:</label>
        <select
          id="category"
          name="category"
          className="bg-slate-100 p-2"
          value={expense.category}
        >
          <option>---Seleccione---</option>
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-xl">Fecha Gasto:</label>

        <DatePicker value={expense.date} className="bg-slate-100 p-2 border-0" />

      </div>

      <input 
        type="submit" 
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value="Registrar gasto"
      />

    </form>
  )
}
