import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../components/Navbar'; 

const Graph = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('gender');
  const [randomSalaries, setRandomSalaries] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axiosInstance.get('/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    if (event.target.value === 'salary') {
      setRandomSalaries(getRandomSalaries());
    }
  };

  const getRandomSalaries = () => {
    const salaries = employees.map(employee => employee.salary);
    const uniqueSalaries = [...new Set(salaries)];
    const shuffled = uniqueSalaries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4); // Select 4 random salaries
  };

  const chartData = () => {
    if (selectedCategory === 'salary') {
      const salaryCounts = randomSalaries.map(salary => ({
        name: salary,
        count: employees.filter(employee => employee.salary === salary).length,
      }));
      return salaryCounts;
    } else {
      const categories = [...new Set(employees.map(employee => employee[selectedCategory]))];
      return categories.map(category => {
        const count = employees.filter(employee => employee[selectedCategory] === category).length;
        return { name: category, count }; // Change value key to count
      });
    }
  };

  const calculateSalaryStats = () => {
    const salaries = employees.map(employee => employee.salary);
    const totalSalary = salaries.reduce((acc, curr) => acc + curr, 0);
    const numberOfPersons = employees.length;
    const highestSalary = Math.max(...salaries);
    const lowestSalary = Math.min(...salaries);

    return {
      totalSalary,
      numberOfPersons,
      highestSalary,
      lowestSalary,
    };
  };

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#A4DE6C',
  ];

  const dataForCharts = chartData();
  const { totalSalary, numberOfPersons, highestSalary, lowestSalary } = calculateSalaryStats();

  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar onSearch={() => {}} />
      <div className="flex items-center justify-center p-6 mt-4"> {/* Add margin-top for navbar */}
        <div className="bg-blue-50 shadow-md rounded-lg p-6 w-full max-w-5xl">
          <h1 className="text-2xl font-bold mb-4 text-center">Employee Data Visualization</h1>
          <div className="mb-4">
            <label htmlFor="category" className="mr-2">Select Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 rounded border border-gray-300"
            >
              <option value="gender">Gender</option>
              <option value="nationality">Nationality</option>
              <option value="category">Category</option>
              <option value="salary">Salary</option>
            </select>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col items-center">
              <PieChart width={200} height={200}>
                <Pie
                  data={dataForCharts}
                  dataKey="count"
                  nameKey="name"
                  outerRadius={70}
                  fill="#8884d8"
                  label={(entry) => entry.count} // Only show numerical count
                >
                  {dataForCharts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div className="flex flex-col items-center">
                {dataForCharts.map((entry, index) => (
                  <div key={index} style={{ color: COLORS[index % COLORS.length] }}>
                    {entry.name}: {entry.count}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center ml-4"> {/* Add margin-left to move left */}
              <BarChart width={300} height={300} data={dataForCharts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 14 }} // Adjust the font size here
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count">
                  {dataForCharts.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
              <p className="text-center">Bar Chart</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">Salary Summary</h2>
            <p>Total Salary: ${totalSalary}</p>
            <p>Number of Persons: {numberOfPersons}</p>
            <p>Highest Salary: ${highestSalary}</p>
            <p>Lowest Salary: ${lowestSalary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
