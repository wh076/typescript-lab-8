export type RGBColor = [number, number, number];

export enum ColorName {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
}

const colors: Record<ColorName, RGBColor> = {
  [ColorName.Red]: [255, 0, 0],
  [ColorName.Green]: [0, 255, 0],
  [ColorName.Blue]: [0, 0, 255],
};

export function rgbToHex(color: RGBColor): string {
  const channels = color.map((channel) => {
    if (!Number.isInteger(channel) || channel < 0 || channel > 255) {
      throw new RangeError('Канал RGB должен быть целым числом от 0 до 255.');
    }
    return channel.toString(16).padStart(2, '0');
  });

  return '#' + channels.join('');
}

export function getColor(name: ColorName): { rgb: RGBColor; hex: string } {
  const rgb: RGBColor = [...colors[name]];
  return { rgb, hex: rgbToHex(rgb) };
}

for (const name of Object.values(ColorName)) {
  console.log(name, getColor(name));
}

try {
  console.log(rgbToHex([256, 0, 0]));
} catch (error) {
  if (error instanceof RangeError) {
    console.log(error.name, error.message);
  } else {
    throw error;
  }
}
