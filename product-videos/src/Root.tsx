import "./fonts";
import { Composition, Folder } from "remotion";
import { calculateAdMetadata, ProductAd } from "./ProductAd";
import { DURATIONS, featuresDuration, FPS, HEIGHT, totalDuration, WIDTH } from "./lib/timing";
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
  const preview = products[0];

  return (
    <>
      {/* فيديو لكل منتج × كل Hook: مثلاً portable-sink-hook1 */}
      {products.map((product) => (
        <Folder key={product.id} name={product.id}>
          {product.hooks.map((_, i) => (
            <Composition
              key={i}
              id={`${product.id}-hook${i + 1}`}
              component={ProductAd}
              schema={adSchema}
              defaultProps={{ product, hookIndex: i }}
              durationInFrames={totalDuration(product)}
              calculateMetadata={calculateAdMetadata}
              {...size}
            />
          ))}
        </Folder>
      ))}

      {/* المشاهد لوحدها للمعاينة والتعديل */}
      <Folder name="Scenes">
        <Composition
          id="Scene-Hook"
          component={Hook}
          defaultProps={{ product: preview, hookIndex: 0 }}
          durationInFrames={DURATIONS.hook}
          {...size}
        />
        <Composition id="Scene-Problem" component={Problem} defaultProps={{ product: preview }} durationInFrames={DURATIONS.problem} {...size} />
        <Composition id="Scene-Reveal" component={Reveal} defaultProps={{ product: preview }} durationInFrames={DURATIONS.reveal} {...size} />
        <Composition id="Scene-Features" component={Features} defaultProps={{ product: preview }} durationInFrames={featuresDuration(preview)} {...size} />
        <Composition id="Scene-Uses" component={Uses} defaultProps={{ product: preview }} durationInFrames={DURATIONS.uses} {...size} />
        <Composition id="Scene-Offer" component={Offer} defaultProps={{ product: preview }} durationInFrames={DURATIONS.offer} {...size} />
        <Composition id="Scene-Cta" component={Cta} defaultProps={{ product: preview }} durationInFrames={DURATIONS.cta} {...size} />
      </Folder>
    </>
  );
};
