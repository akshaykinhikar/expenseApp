import { render, screen } from '@testing-library/react';
import Footer from './footer';

test('footer mounted', () => {
    render(<Footer />);

    const ele = screen.getByText(/kinhikar.akshay32@gmail.com/i);

    expect(ele).toBeInTheDocument();
})