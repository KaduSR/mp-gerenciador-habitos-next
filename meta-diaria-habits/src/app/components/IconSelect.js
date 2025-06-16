'use client'

import React from 'react'
import Icon from './Icon';

export default function IconSelect({ name, onChange }) {
    const icons = ['sun', 'book', 'meditation'];
    return (
        <div role="radiogroup">
            {icons.map((ic) => (
                <label key={ic}>
                    <Icon name={ic} width={24} height={24} />
                    <input type="radio" name="icon" value={ic}
                        checked={name === ic}
                        onChange={() => onChange(ic)} />
                </label>
            ))}
        </div>
    );
}