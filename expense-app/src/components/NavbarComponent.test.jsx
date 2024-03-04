import { render, screen } from '@testing-library/react';
import NavbarComponent from './NavbarComponent';
import { Outlet, Link, NavLink } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

test('NavbarComponent mounted', () => {
    render(
        <BrowserRouter>
            <NavbarComponent />
        </BrowserRouter>
    );

    const ele = screen.getByText(/Expense App/i);

    expect(ele).toBeInTheDocument();
})