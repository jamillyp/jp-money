import React, { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { api } from '../../services/api';
import { TransactionsContext } from '../../TransactionsContext';

import incomeImg from '../../assets/svg/entradas.svg';
import outcomeImg from '../../assets/svg/saidas.svg';
import closeImg from '../../assets/svg/botao-fechar.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles';
interface newTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: newTransactionModalProps) {
    const { createTransaction } = useContext(TransactionsContext);
    
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
  
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        });
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('');
        onRequestClose();
    }

    

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >
            <button
                type='button'
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt='Fechar modal' />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input
                    placeholder='Título'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    placeholder='Valor' type='number'
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>


                    <RadioBox
                        type='button'
                        // className={type === 'deposit' ? 'active' : ''}
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor='green'
                    >
                        <img src={incomeImg} alt='entradas'></img>
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type='button'
                        onClick={() => { setType('withdraw') }}
                        isActive={type === 'withdraw'}
                        activeColor='red'
                    >
                        <img src={outcomeImg} alt='saídas'></img>
                        <span>Saída</span>
                    </RadioBox>

                </TransactionTypeContainer>

                <input
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <button type='submit'>
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}