import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ShoppingCart, Plus, Trash2, CheckCircle2, Circle, Users } from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface GroceryListProps {
  onNavigate: (screen: Screen) => void;
}

export const GroceryList: React.FC<GroceryListProps> = ({ onNavigate }) => {
  const [items, setItems] = React.useState([
    { id: '1', name: 'Spinach', category: 'Vegetables', quantity: '200g', completed: false },
    { id: '2', name: 'Greek Yogurt', category: 'Dairy', quantity: '500g', completed: true },
    { id: '3', name: 'Lentils', category: 'Pantry', quantity: '1kg', completed: false },
    { id: '4', name: 'Paneer', category: 'Dairy', quantity: '250g', completed: false },
    { id: '5', name: 'Apples', category: 'Fruits', quantity: '4 pcs', completed: false },
  ]);

  const [newItem, setNewItem] = React.useState({ name: '', quantity: '', category: 'Vegetables' });
  const [isAdding, setIsAdding] = React.useState(false);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name) return;
    setItems([...items, { ...newItem, id: Math.random().toString(), completed: false }]);
    setNewItem({ name: '', quantity: '', category: 'Vegetables' });
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <header className="bg-white/80 backdrop-blur-md border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="text-accent" size={20} />
              </div>
              <span className="text-xl font-serif font-bold text-accent">My Health Buddy</span>
            </div>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="font-bold uppercase tracking-widest text-xs">Back to Dashboard</span>
            </button>
          </div>
          <h1 className="text-xl font-serif font-bold text-accent">Grocery List</h1>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-8 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif">Shopping List</h2>
            <p className="text-text-secondary">Items needed for your planned meals</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-accent text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <Plus size={24} className={cn(isAdding && "rotate-45 transition-transform")} />
          </button>
        </div>

        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={addItem}
            className="bg-white p-6 rounded-2xl border border-accent/20 shadow-xl space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Item Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                  placeholder="e.g. Milk"
                  className="w-full p-3 rounded-xl bg-bg-secondary border border-black/5 focus:border-accent outline-none font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Quantity</label>
                <input 
                  type="text" 
                  value={newItem.quantity}
                  onChange={e => setNewItem({...newItem, quantity: e.target.value})}
                  placeholder="e.g. 1L"
                  className="w-full p-3 rounded-xl bg-bg-secondary border border-black/5 focus:border-accent outline-none font-bold"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value})}
                className="flex-1 p-3 rounded-xl bg-bg-secondary border border-black/5 focus:border-accent outline-none font-bold"
              >
                {['Vegetables', 'Fruits', 'Dairy', 'Pantry', 'Meat', 'Other'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button type="submit" className="bg-accent text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all">
                Add Item
              </button>
            </div>
          </motion.form>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <motion.div 
              key={item.id}
              layout
              className={`bg-white p-4 rounded-2xl border border-black/5 flex items-center gap-4 transition-all ${item.completed ? 'opacity-50' : ''}`}
            >
              <button 
                onClick={() => toggleItem(item.id)}
                className={`transition-colors ${item.completed ? 'text-accent' : 'text-text-secondary'}`}
              >
                {item.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={`font-bold ${item.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                    {item.name}
                  </p>
                  {item.quantity && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold">
                      {item.quantity}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary uppercase tracking-wider">{item.category}</p>
              </div>

              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 text-text-secondary hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent">
              <ShoppingCart size={40} />
            </div>
            <p className="text-text-secondary">Your list is empty. Add items to get started!</p>
          </div>
        )}
      </main>
    </div>
  );
};
