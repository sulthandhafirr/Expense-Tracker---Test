import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Category } from '../constants';

export interface Expense {
  _id?: string;
  id?: number;
  name: string;
  category: Category;
  amount: number;
  date: string;
  description?: string;
}

export const useExpenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = async (expenseData: Omit<Expense, '_id' | 'id'>) => {
    const newExpense = {
      ...expenseData,
      _id: Date.now().toString(),
      id: Date.now()
    };
    setExpenses([...expenses, newExpense]);
    navigate('/expenses');
    return { success: true };
  };

  const updateExpense = async (id: string, expenseData: Partial<Expense>) => {
    setExpenses(expenses.map(e => 
      e._id === id || e.id?.toString() === id ? { ...e, ...expenseData } : e
    ));
    return { success: true };
  };

  const deleteExpense = async (id: string | number) => {
    setExpenses(expenses.filter(e => e._id !== id && e.id !== id));
    return { success: true };
  };

  const getExpensesByCategory = () => {
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    
    return categoryTotals;
  };

  const getTotalExpense = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getTotalExpense
  };
};
