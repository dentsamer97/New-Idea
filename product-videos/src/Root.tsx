import "./fonts";
import { Composition, Folder, Still } from "remotion";
import { calculateAdMetadata, ProductAd } from "./ProductAd";
import { StaticAd } from "./StaticAd";
import { defaultAds } from "./lib/plan";
import { resolveAd } from "./lib/resolve";
import { FPS, HEIGHT, sceneDurations, TIMING, totalDuration, WIDTH } from "./lib/timing";
import { products } from "./products";
import { adSchema } from "./schema";
import { Cta } from "./scenes/Cta";
import { Features } from "./scenes/Features";
import { Hook } from "./scenes/Hook";
import { Offer } from "./scenes/Offer";
import { Problem } from "./scenes/Problem";
import { Reveal } from "./scenes/Reveal";
import { Uses } from "./scenes/Uses";

const size = { fps: FPS, width: WIDTH, height: HEIGHT };

export const RemotionRoot: React.FC = () => {
  const preview = defaultAds()[0];
  const content = resolveAd(preview);
  const d = sceneDurations(content, "showcase");

  return (
    <>
      {/* الإعلانات الأساسية: مثلاً sink-kq */}
      {products.map((product) => (
        <Folder key={product.id} name={product.id}>
          {defaultAds()
            .filter((ad) => ad.productId === product.id)
            .map((ad) => (
              <Composition
                key={ad.hookId}
                id={`${product.code}-${ad.hookId}`}
                component={ProductAd}
                schema={adSchema}
                defaultProps={ad}
                durationInFrames={totalDuration(resolveAd(ad), "showcase")}
                calculateMetadata={calculateAdMetadata}
                {...size}
              />
            ))}
        </Folder>
      ))}

      {/* أي إعلان: اختار المنتج والزاوية والهوك والفورمات من القايمة الجانبية */}
      <Folder name="Builder">
        <Composition
          id="Ad"
          component={ProductAd}
          schema={adSchema}
          defaultProps={preview}
          durationInFrames={totalDuration(content, "showcase")}
          calculateMetadata={calculateAdMetadata}
          {...size}
        />
        <Still id="AdStatic" component={StaticAd} schema={adSchema} defaultProps={{ ...preview, format: "static" }} width={WIDTH} height={HEIGHT} />
      </Folder>

      {/* المشاهد لوحدها للمعاينة والتعديل */}
      <Folder name="Scenes">
        <Composition id="Scene-Hook" component={Hook} defaultProps={{ content }} durationInFrames={d.hook} {...size} />
        <Composition id="Scene-Problem" component={Problem} defaultProps={{ content }} durationInFrames={d.problem} {...size} />
        <Composition id="Scene-Reveal" component={Reveal} defaultProps={{ content }} durationInFrames={d.reveal} {...size} />
        <Composition
          id="Scene-Features"
          component={Features}
          defaultProps={{ content, featureFrames: TIMING.showcase.feature }}
          durationInFrames={d.features}
          {...size}
        />
        <Composition id="Scene-Uses" component={Uses} defaultProps={{ content }} durationInFrames={d.uses} {...size} />
        <Composition id="Scene-Offer" component={Offer} defaultProps={{ content }} durationInFrames={d.offer} {...size} />
        <Composition id="Scene-Cta" component={Cta} defaultProps={{ content }} durationInFrames={d.cta} {...size} />
      </Folder>
    </>
  );
};
