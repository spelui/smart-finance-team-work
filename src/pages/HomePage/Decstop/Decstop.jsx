import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Balance from "../../../component/Balance";
import HeaderTransaction from "../../../component/HeaderTransaction/HeaderTransaction";
import TransactionForm from "../../../component/TransactionForm/TransactionForm";
import TransactionTable from "../../../component/TransactionTable/TransactionTable";
import Summary from "../../../component/Summary/Summary";

import sprite from "../../../images/sprite.svg";
import s from "./Decstop.module.scss";
import st from "../../../component/Summary/Summary.module.scss";

export const Decstop = () => {
  const userMonth = useSelector((state) => state.transactions.month);

  const date = new Date();
  const monthNow = date.getMonth() + 1;
  return (
    <>
      <div className={s.header}>
        <Balance />

        <Link to="/report" className={s.report}>
          Перейти к отчетам
          <svg width="24" height="24" className={s.logo}>
            <use href={`${sprite}#chart`}></use>
          </svg>
        </Link>
      </div>

      <Routes>
        <Route path="income" />
        <Route path="expense" />
      </Routes>

      <div className={s.chart}>
        <HeaderTransaction />
        <TransactionForm />
        <div className={s.chart__cover}>
          <TransactionTable />

          <div className={s.summary__dec}>
            <h3 className={st.summary__title}>Сводка</h3>
            <ul className={st.summary__list}>
              {Object.keys(userMonth)
                .splice(0, monthNow)
                .map((month) => (
                  <li key={month} className={st.summary__item}>
                    <p className={st.summary__text}>
                      {month}
                      <span>{userMonth[month]}</span>
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <Summary />
    </>
  );
};