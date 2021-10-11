import React, { FC } from 'react';
import { Queries } from '@greeneggs/graphql';
import { CategoriesVariables, Categories_categories_data, RecipeFilter, Sort, Categories as CategoriesType } from '@greeneggs/types/graphql';
import { Background, LazyList } from '@greeneggs/ui';
import { Text } from '@ui-kitten/components';

interface CategoryItemProps {
  category: Categories_categories_data
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  return (
    <Text>{category.name}</Text>
  );
}

export const Categories: FC = () => {
  return (
    <Background>
      <LazyList<
        CategoriesType,
        CategoriesVariables,
        Categories_categories_data,
        Sort,
        RecipeFilter
      >
        query={Queries.GET_CATEGORIES}
        variables={{
          query: '',
        }}
        dataKey="categories"
        emptyMessage="No categories found."
        errorMessage="No categories found."
        renderItem={({ item: category, index }) => (
          <CategoryItem category={category} key={index.toString()} />
        )}
      />
    </Background>
  );
}
