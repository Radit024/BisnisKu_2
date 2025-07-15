import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Gauge, 
  DollarSign, 
  Factory, 
  Package, 
  BarChart3 
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Gauge },
  { path: '/transactions', label: 'Penjualan', icon: DollarSign },
  { path: '/production', label: 'Produksi', icon: Factory },
  { path: '/stock', label: 'Stok', icon: Package },
  { path: '/reports', label: 'Laporan', icon: BarChart3 },
];

export default function HorizontalNav() {
  const [location] = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-16 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <a
                  className={`flex-shrink-0 px-6 py-4 text-center border-b-3 font-medium transition-all duration-200 min-w-[100px] group ${
                    isActive
                      ? 'border-primary text-primary bg-primary/8'
                      : 'border-transparent text-gray-600 hover:text-primary hover:bg-primary/5 hover:border-primary/30'
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-2 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`} />
                  <div className="text-sm font-semibold whitespace-nowrap">{item.label}</div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
