# -*- coding: utf-8 -*-
#!/usr/bin/env python
# coding: utf-8
import spacy
import sys


title = str(sys.argv)
nlp = spacy.load("fr_core_news_sm")
doc = nlp(title)
for token in doc:
    if token.pos_ == u'VERB' :
        print(token.text)

