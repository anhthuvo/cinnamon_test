import styles from "./style.module.scss";
import typo from "@/styles/typography.module.scss";

import { useEffect, useRef, useState } from "react";
import { getUserByNameApi, getUsersApi } from "@/api";
import Table from "../../components/Table";
import useDebounce from "@/utils/useDebounce";

const PAGE_SIZE = 30

export default function Home() {
  const [data, setData] = useState({
    selectNumber: 0,
    users: [] as any,
  });
  const [searchText, setSearchText] = useState("")
  const value = useDebounce(searchText, 1000);
  const lastUserId = useRef(0)
  const currentPosition = useRef(0)

  useEffect(
    () => {
      if (value) {
        getUserByNameApi(value).then(res => {
          setData({
            selectNumber: 0,
            users: [res.data],
          });
        })
        .catch(error => {
          setData({
            selectNumber: 0,
            users: [],
          });
        })
      } 
      else {
        getUsers(0)
      }
    },
    [value] 
  );

  const lazyLoad = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
     currentPosition.current = window.pageYOffset
     getUsers(lastUserId.current)
    }
   }

  const getUsers = (userId:number) => {
    getUsersApi(PAGE_SIZE, userId).then(res => {
          const newData = userId === 0? [...res.data] : [...data.users, ...res.data]
          setData({
            selectNumber: 0,
            users: newData,
          })
          const len = res.data.length
          lastUserId.current = res.data[len-1].id
          if (userId !== 0) {
            window.scrollTo(0, currentPosition.current)
          }
      })
  }

  useEffect(() => {
    window.addEventListener('scroll', lazyLoad);
    return () => {
    window.removeEventListener('scroll', lazyLoad);
    }
  }, [data]);

  return (
    <>
      <main className={styles.warpper}>
        <div className={"container " + styles.header}>
          <div className={styles.header_content}>
            <h1 className={typo.title_l}>User manager</h1>
            <div className={styles.search_wrapper}>
              <img
                src="/assets/icons/search.svg"
                className={styles.search_icon}
              />
              <input
                type="text"
                placeholder="Search.."
                name="search"
                className={styles.search_input}
                onChange={(e) => setSearchText(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className={"container"}>
          {
            value && data.users.length === 0 ? (
              <p>Not found</p>
            ): (
              <Table data={data} setData={setData} />
            )
          }
          
        </div>
        <div className={styles.control_wrapper}>
          <div className={"container"}>
            <div className={styles.control + " " + typo.title_m}>
              <span>{data.selectNumber} selected</span>
              <p>
                <span>Delete |</span>
                <span> Download</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


