import React from 'react';
import { Routes, Route, Navigate, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPeriodData } from "../../../redux/user/user-operations";
import { getIncome } from '../../../redux/transactions/transactionsOperation';
import { getExpense } from '../../../redux/transactions/transactionsOperation';

import Balance from '../../../component/Balance';
import CalendarNew from '../../../component/Calendar/Calendar';

import sprite from '../../../images/sprite.svg'
import s from './Mobile.module.scss'

export const Mobile = () => {
    const dispatch = useDispatch();

    const incomes = useSelector((state) => state.transactions.items);
    const expenses = useSelector((state) => state.transactions.itemsExpense);
    const selectedDate = useSelector(
        (state) => state.transactions.date
    );

    const normalizedDate = selectedDate?.slice(0, 7);

    useEffect(() => {
        if (normalizedDate !== undefined) {
            dispatch(getPeriodData(normalizedDate));
            dispatch(getIncome());
            dispatch(getExpense());
        }
    }, [dispatch, normalizedDate]);
    
    
    const filterDate = () => {
        const filteredExpenses = expenses?.filter(({ date }) => date === selectedDate)
        const filteredIncomes = incomes?.filter(({ date }) => date === selectedDate)
        return [...filteredIncomes, ...filteredExpenses]; 
    }

    const filteredDate = filterDate();
    
    return (
        <>
            <div className={s.homepage__wrapper}>
                <div className={s.homepage__toppart}>
                    <div className={s.homepage__header}>
                        <Link to="/report" className={s.homepage__report}>
                            Перейти к отчетам
                            <svg width="24" height="24" className={s.homepage__logo}>
                                <use href={`${sprite}#chart`}></use>
                            </svg>
                        </Link>
                        <Balance />
                    </div>
                    <CalendarNew/>
                </div>
                <div className={s.homepage__botompart}>
                    <div className={s.transactions}>
                        <ul className={s.transactions__list}>
                            {filteredDate.map(({ _id, category, date, amount, description }) => {
                                const isIncome = (category === "З/П" || category === "Доп. доход");
                                return <li key={_id} className={s.transactions__item}>
                                    <div className={s.transactions__leftpart}>
                                        <p className={s.transactions__description}>{description}</p>
                                        <p className={s.transactions__date}>{date}</p>
                                    </div>
                                    <p className={s.transactions__category}>{category}</p>
                                    <div className={s.transactions__rightpart}>
                                        <p style={{color: isIncome ? '#407946' : '#E7192E'}} className={s.transactions__amount}>{isIncome ? amount : `- ${amount}`} грн.</p>
                                        <svg width='15px' height='18px' className={s.heroTitle}>
                                            <use  href={`${sprite}#delete-icon`}></use>
                                        </svg>
                                    </div>
                                </li>;
                            })}
                        </ul>
                    </div>
                    <div className={s.homepage__btnwrapper}>
                        <Link to='/add-expense' className={s.homepage__btn}>Расход</Link>
                        <Link to='/add-income' className={s.homepage__btn}>Доход</Link>
                    </div>
                </div>
            </div>
        </>
    );
};