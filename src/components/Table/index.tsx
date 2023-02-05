import styles from "./style.module.scss";
import typo from "@/styles/typography.module.scss";
import { Dispatch, SetStateAction } from "react";

interface tableProps {
    data: {
        selectNumber: number,
        users: any[]
    }
    setData: Dispatch<SetStateAction<any>>
}

export default function Table({ data, setData }: tableProps) {
    const select = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const newData = [...data.users]
        newData[i].selected = e.target.checked
        let total = 0
        newData.forEach(e => {
            if (e.selected) total += 1;
        })
        setData({
            selectNumber: total,
            users: newData
        })
    }
  return (
    <div>
      <div className={styles.header}>
        <div>
          <input type="checkbox" className={styles.checkbox} />
        </div>
        <div>
          <p className={typo.title_m}>No.</p>
        </div>
        <div>
          <p className={typo.title_m}>Name</p>
        </div>
        <div>
          <p className={typo.title_m}>Blog</p>
        </div>
        <div>
          <p className={typo.title_m}>Actions</p>
        </div>
      </div>

      {data.users.map((user, i) => (
        <div className={styles.row} key={i}>
          <div>
            <input checked={user.selected || false} type="checkbox" className={styles.checkbox} onChange={(e) => select(e, i)} />
          </div>
          <div>
            <p className={typo.content_m}>{user.id}</p>
          </div>
          <div>
            <p className={typo.content_m}>{user.login}</p>
          </div>
          <div>
            <a className={typo.content_m} href={user.repos_url} target={"_blank"}>
              {user.repos_url}
            </a>
          </div>
          <div>
            <img src="/assets/icons/download.svg" className={"icon"} />
            <div className={styles.line}></div>
            <img src="/assets/icons/bin.svg" className={"icon"} />
          </div>
        </div>
      ))}
    </div>
  );
}
