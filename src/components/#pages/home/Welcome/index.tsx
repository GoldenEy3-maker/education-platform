import Image from "next/image"
import WelcomeAguJpg from "~/assets/preview.jpg"
import { IconRightArrowAlt } from "~/components/ui/Icons"
import Link from "~/components/ui/Link"
import styles from "./styles.module.sass"

const Welcome: React.FC = () => {
  return (
    <section className={styles.welcome}>
      <div className={styles.wrapper}>
        <Image
          src={WelcomeAguJpg.src}
          alt=""
          blurDataURL={WelcomeAguJpg.blurDataURL}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className={styles.overlay}>
          <h2>Алтайский государственный университет (АлтГУ)</h2>
          <p>
            — высшее учебное заведение, классический университет в Алтайском
            крае РФ. Образован сразу как классический университет в 1973 году.
            Ведёт учебную, научную и культурно-просветительскую деятельность.
            Расположен в Барнауле с филиалами в городах и сёлах края. В апреле
            2017 года стал одним из региональных опорных университетов. В
            декабре 2017 года распоряжением Минобрнауки РФ признан
            университетским центром инновационного, технологического и
            социального развития.
          </p>
          <Link variant="filled" href="https://www.asu.ru/" target="_blank">
            Перейти на сайт
            <IconRightArrowAlt />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Welcome
