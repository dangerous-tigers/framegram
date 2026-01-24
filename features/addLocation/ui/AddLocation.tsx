'use client';

import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

import s from './addLocation.module.scss';

import { PinOutline } from '@/assets/icons';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { InputWithIcon } from '@/shared/ui/inputWithIcon';

type City = {
  id: string;
  name: string;
  country: string;
};

type ApiResponse = {
  predictions: Array<{
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  }>;
};

export const AddLocation = () => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { show } = useAlertStore();

  const fetchCities = useMemo(
    () =>
      debounce(async (input: string) => {
        if (!input) {
          setCities([]);
          return;
        }

        const controller = new AbortController();
        try {
          const res = await fetch(
            `https://google-place-autocomplete-and-place-info.p.rapidapi.com/maps/api/place/autocomplete/json?input=${input}`,
            {
              method: 'GET',
              headers: {
                'x-rapidapi-key': 'a037953195msh9488eebcbc5b895p1de423jsnbfd27db0400c',
                'x-rapidapi-host': 'google-place-autocomplete-and-place-info.p.rapidapi.com',
              },
              signal: controller.signal,
            },
          );

          const data: ApiResponse = await res.json();
          const citiesData = data.predictions.map((p) => ({
            id: p.place_id,
            name: p.structured_formatting.main_text,
            country: p.structured_formatting.secondary_text,
          }));
          setCities(citiesData);
        } catch (err: unknown) {
          if (err instanceof Error && err.name !== 'AbortError') {
            show({ error: String(err), severity: 'error', description: String(err), variant: 'filled' });
          }
        }

        return () => controller.abort();
      }, 500),
    [],
  );

  useEffect(() => {
    fetchCities(query);

    return () => {
      fetchCities.cancel();
    };
  }, [query, fetchCities]);

  //Это закрытие дропдаун вне клика по нему
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={s.wrapper}
      ref={wrapperRef}
    >
      <InputWithIcon
        value={query}
        label='Add location'
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        placeholder='New York'
        icon={<PinOutline />}
      />
      {showDropdown && cities.length > 0 && (
        <ul className={s.dropdown}>
          {cities.map((city) => (
            <li
              key={city.id}
              onClick={() => {
                setQuery(`${city.name}, ${city.country}`);
                setShowDropdown(false);
              }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
