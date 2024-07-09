
import { categories } from "../data/categories";

import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



export default function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  });

  const [error, setError] = useState('');
  const [previosAmount, setPreviosAmount] = useState(0);

  const {dispatch, state, remainingBudget} = useBudget();

  useEffect(() => {

    if (state.editingId) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0];

      setExpense(editingExpense);
      setPreviosAmount(editingExpense.amount); 
    }

  }, [state.editingId])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    const isAmountField = ['amount'].includes(name);

    setExpense({
      ...expense,
      [name] : isAmountField ? Number(value) : value
    })

  }

  const handleChangeDate = (value: Value) => {

    setExpense({
      ...expense,
      date: value
    });

  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (Object.values(expense).includes('')) {
      setError("Todos los campos son obligatorios")
      return;
    }

    if ( (expense.amount - previosAmount) > remainingBudget) {
      setError("El gasto se pasa del presupuesto disponible")
      return;
    }

    if (state.editingId){
      dispatch({type: "update-expense", payload: {expense: {id: state.editingId, ...expense}}});
    }else{
      dispatch({type: "add-expense", payload: {expense}});
    }

    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    });
    
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
      >
        {state.editingId ? "Guardar cambios" : "Nuevo Gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
        <input onChange={handleChange} value={expense.expenseName} type="text" id="expenseName" placeholder="Anade nombre del gasto" className="bg-slate-100 p-2" name="expenseName" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Cantidad:</label>
        <input onChange={handleChange} value={expense.amount} type="number" id="amount" placeholder="Anade la cantidad del gasto" className="bg-slate-100 p-2" name="amount" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Categoria:</label>
        <select
          id="category"
          name="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChange}
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

        <DatePicker
          value={expense.date}
          className="bg-slate-100 p-2 border-0"
          onChange={handleChangeDate}
        />

      </div>

      <input 
        type="submit" 
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? "Guardar Cambios" : "Registrar Gasto"}
      />

    </form>
  )
}
