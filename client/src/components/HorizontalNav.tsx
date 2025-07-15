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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <a
                  className={`flex-shrink-0 px-4 py-3 text-center border-b-2 font-medium transition-colors min-w-[80px] ${
                    isActive
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-gray-500 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-xs font-medium">{item.label}</div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
