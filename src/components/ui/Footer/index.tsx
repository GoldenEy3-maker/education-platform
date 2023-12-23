import NextLink from "next/link"
import Link from "~/components/ui/Link"
import { cls } from "~/utils/func"
import {
  IconLogoOkRu,
  IconLogoTelegram,
  IconLogoUniversV1,
  IconLogoVk,
  IconLogoYoutube,
} from "../Icons"
import styles from "./styles.module.sass"

const Footer: React.FC = () => {
  return (
    <footer className={cls(styles.footer, "content-grid")}>
      <header className={styles.header}>
        <div className={styles.symbols}>
          <span className={styles.logo}>
            <IconLogoUniversV1 />
          </span>
          <div>
            <h3 className={styles.title}>
              Алтайский государственный университет
            </h3>
            <p className={styles.address}>
              ФГБОУ ВО «Алтайский государственный университет» 656049, Барнаул,
              пр. Ленина, 61
            </p>
          </div>
        </div>
        <div className={styles.social}>
          <Link asIcon color="on-primary" href={"#"} target="_blank">
            <IconLogoTelegram />
          </Link>
          <Link asIcon color="on-primary" href={"#"} target="_blank">
            <IconLogoVk />
          </Link>
          <Link asIcon color="on-primary" href={"#"} target="_blank">
            <IconLogoYoutube />
          </Link>
          <Link asIcon color="on-primary" href={"#"} target="_blank">
            <IconLogoOkRu />
          </Link>
        </div>
      </header>
      <nav className={styles.nav}>
        <div className={styles.navGroup}>
          <h5>Заголовок</h5>
          <div className={styles.navLinks}>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
          </div>
        </div>
        <div className={styles.navGroup}>
          <h5>Заголовок</h5>
          <div className={styles.navLinks}>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
          </div>
        </div>
        <div className={styles.navGroup}>
          <h5>Заголовок</h5>
          <div className={styles.navLinks}>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
          </div>
        </div>
        <div className={styles.navGroup}>
          <h5>Заголовок</h5>
          <div className={styles.navLinks}>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
            <NextLink href="#">Ссылка</NextLink>
          </div>
        </div>
      </nav>
      <div className={styles.contacts}>
        <p>
          Приемная комиссия АлтГУ,{" "}
          <NextLink href="mailto:prcom@asu.ru">prcom@asu.ru</NextLink>, тел.{" "}
          <NextLink href="tel:3852291222">(3852) 291-222</NextLink>
        </p>
        <p>
          Ректор Алтайского государственного университета,{" "}
          <NextLink href="mailto:rector@asu.ru">rector@asu.ru</NextLink>, тел.{" "}
          <NextLink href="tel:3852291291">(3852) 291-291</NextLink>
        </p>
        <p>
          При полном или частичном использовании материалов сайта ссылка на сайт
          АлтГУ обязательна.
        </p>
      </div>
    </footer>
  )
}

export default Footer
