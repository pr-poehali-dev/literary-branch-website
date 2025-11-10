import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Submission {
  id: number;
  author_name: string;
  author_email: string;
  text_content: string;
  created_at: string;
  status: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/8c7182c0-5f32-4a96-854d-a00d5156434b');
      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">Админ-панель</h1>
            <a 
              href="/" 
              className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
            >
              <Icon name="ArrowLeft" size={16} />
              На главную
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Присланные тексты</h2>
          <p className="text-muted-foreground">
            Всего заявок: <span className="font-semibold">{submissions.length}</span>
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : submissions.length === 0 ? (
          <Card className="p-12 text-center">
            <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Пока нет присланных текстов</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card 
                key={submission.id} 
                className="hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 flex items-center gap-3">
                        <span>{submission.author_name}</span>
                        <Badge variant="outline" className="font-normal">
                          {submission.status === 'pending' ? 'На рассмотрении' : submission.status}
                        </Badge>
                      </CardTitle>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Icon name="Mail" size={14} />
                          <span>{submission.author_email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" size={14} />
                          <span>{formatDate(submission.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                      className="ml-4 p-2 hover:bg-accent/10 rounded-md transition-colors"
                    >
                      <Icon 
                        name={expandedId === submission.id ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                      />
                    </button>
                  </div>
                </CardHeader>
                
                {expandedId === submission.id && (
                  <CardContent className="pt-0">
                    <div className="border-t border-border pt-4">
                      <h4 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">
                        Текст произведения
                      </h4>
                      <div className="bg-secondary/30 p-6 rounded-md">
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {submission.text_content}
                        </p>
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground">
                        Символов: {submission.text_content.length}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
