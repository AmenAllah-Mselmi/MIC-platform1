import React from 'react';
import {
  createPlateUI,
  Plate,
  PlateProvider,
  createPlugins,
} from '@udecode/plate';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
} from '@udecode/plate-basic-marks';
import { FontColorPlugin, FontBackgroundColorPlugin } from '@udecode/plate-font';
import { ListStyleTypePlugin } from '@udecode/plate-indent-list';
import { ImagePlugin } from '@udecode/plate-media';

const plugins = createPlugins([
  BoldPlugin(),
  ItalicPlugin(),
  UnderlinePlugin(),
  StrikethroughPlugin(),
  FontColorPlugin(),
  FontBackgroundColorPlugin(),
  ListStyleTypePlugin(),
  ImagePlugin(),
]);

const PlateEditor = () => {
  return (
    <PlateProvider plugins={plugins}>
      <Plate />
    </PlateProvider>
  );
};

export default PlateEditor;