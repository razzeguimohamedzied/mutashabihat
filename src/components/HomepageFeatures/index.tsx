import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'تصفح سهل',
    Svg: require('@site/static/img/feature_browse.svg').default,
    description: (
      <>
        تصفح متشابهات القرآن الكريم بسهولة ويسر، مع تنظيم واضح يساعدك على
        الوصول السريع إلى الآيات المتشابهة.
      </>
    ),
  },
  {
    title: 'دليل شامل',
    Svg: require('@site/static/img/feature_guide.svg').default,
    description: (
      <>
        مرجع متكامل يجمع الآيات القرآنية المتشابهة لفظاً ومعنىً.
      </>
    ),
  },
  {
    title: 'مصدر موثوق',
    Svg: require('@site/static/img/feature_trusted.svg').default,
    description: (
      <>
        محتوى مدروس ومراجَع يعينك على حفظ القرآن الكريم وتمييز الآيات
        المتشابهة بدقة واطمئنان.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
