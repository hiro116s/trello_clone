// TODO: Write BoardLink.test.js instead
/*

import React from 'react';
import { render } from '@testing-library/react';
import BoardList from './Board';
import { createBoard } from './BoardCreate';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders BoardList', () => {
    const { getByText } = render(<Router><BoardList boardList={[
        createBoard(1, 'board1'),
        createBoard(2, 'board2')
    ]}/></Router>);

    const element = getByText('board1');
    expect(element.text).toBe('board1');
    expect(element.href).toBe('http://localhost/b/1');
});

*/