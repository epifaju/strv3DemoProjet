import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa';
import React from 'react';
const sublinks = [

  {
    page: 'accueil',
    links: [
      { label: 'liste personne', icon: <FaCreditCard />, url: '/personnes' },
      { label: 'recherche personne', icon: <FaCreditCard />, url: '/formulaireRecherchePersonne' },
      { label: 'ajout personne', icon: <FaCreditCard />, url: '/products' },
    ],
  },
  {
    page: 'informations',
    links: [
      { label: 'recherche simple', icon: <FaCreditCard />, url: '/personnes' },
      { label: 'recherche avancée', icon: <FaCreditCard />, url: '/formulaireRecherchePersonne' },
      { label: 'saisie déclaration', icon: <FaCreditCard />, url: '/products' },
      { label: 'saisie compl. déclaration', icon: <FaCreditCard />, url: '/products' },
    ],
  },
  {
    page: 'personnes',
    links: [
      { label: 'liste', icon: <FaCreditCard />, url: '/personnes' },
      { label: 'recherche', icon: <FaCreditCard />, url: '/formulaireRecherchePersonne' },
      { label: 'ajout', icon: <FaCreditCard />, url: '/products' },
    ],
  },
  {
    page: 'dossiers',
    links: [
      { label: 'plugins', icon: <FaBook />, url: '/products' },
      { label: 'libraries', icon: <FaBook />, url: '/products' },
      { label: 'help', icon: <FaBook />, url: '/products' },
      { label: 'billing', icon: <FaBook />, url: '/products' },
    ],
  },
  {
    page: 'interlocuteurs',
    links: [
      { label: 'about', icon: <FaBriefcase />, url: '/products' },
      { label: 'customers', icon: <FaBriefcase />, url: '/products' },
    ],
  },
  {
    page: 'actes investigations',
    links: [
      { label: 'about', icon: <FaBriefcase />, url: '/products' },
      { label: 'customers', icon: <FaBriefcase />, url: '/products' },
    ],
  },
  {
    page: 'transmissions',
    links: [
      { label: 'about', icon: <FaBriefcase />, url: '/products' },
      { label: 'customers', icon: <FaBriefcase />, url: '/products' },
    ],
  },
  {
    page: 'actions externes',
    links: [
      { label: 'about', icon: <FaBriefcase />, url: '/products' },
      { label: 'customers', icon: <FaBriefcase />, url: '/products' },
    ],
  },
  {
    page: 'pilotage',
    links: [
      { label: 'about', icon: <FaBriefcase />, url: '/products' },
      { label: 'customers', icon: <FaBriefcase />, url: '/products' },
    ],
  },
  {
    page: 'archivage',
    links: [
      { label: 'about', icon: <FaBriefcase />, url: '/products' },
      { label: 'customers', icon: <FaBriefcase />, url: '/products' },
    ],
  },
];

export default sublinks;
